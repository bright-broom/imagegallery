import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Carousel from "../../components/Carousel";
import { getPhotos, generateBlurPlaceholder } from "../../utils/image";
import type { ImageProps } from "../../utils/image/types";

const Home: NextPage<{ currentPhoto: ImageProps }> = ({ currentPhoto }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const index = Number(photoId);

  const currentPhotoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2560/${currentPhoto.public_id}.${currentPhoto.format}`;

  return (
    <>
      <Head>
        <title>Portfolio site</title>
        <meta property="og:image" content={currentPhotoUrl} />
        <meta name="twitter:image" content={currentPhotoUrl} />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <Carousel currentPhoto={currentPhoto} index={index} />
      </main>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const reducedResults = await getPhotos();

  const photoId = context.params?.photoId;
  if (!photoId) {
    return {
      notFound: true,
    };
  }

  const currentPhoto = reducedResults.find(
    (img) => img.id === Number(photoId)
  );

  if (!currentPhoto) {
    return {
      notFound: true,
    };
  }

  currentPhoto.blurDataUrl = await generateBlurPlaceholder(currentPhoto);

  return {
    props: {
      currentPhoto,
    },
  };
};

export async function getStaticPaths() {
  const photos = await getPhotos();
  const paths = photos.map((_, index) => ({
    params: { photoId: index.toString() }
  }));

  return {
    paths,
    fallback: false,
  };
}
