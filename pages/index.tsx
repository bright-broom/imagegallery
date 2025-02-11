import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Bridge from "../components/Icons/Bridge";
import Logo from "../components/Icons/Logo";
import Modal from "../components/Modal";
import cloudinary from "../utils/cloudinary";
import getBase64ImageUrl from "../utils/generateBlurPlaceholder";
import type { CloudinaryResource, ImageProps } from "../utils/types";
import { useLastViewedPhoto } from "../utils/useLastViewedPhoto";
import Header from "../components/Header";

interface HomeProps {
  images: ImageProps[];
}

const Home: NextPage<HomeProps> = ({ images }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current?.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <>
      <Header />
      <Head>
        <title>Next.js Conf 2022 Photos</title>
        <meta
          property="og:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
        <meta
          name="twitter:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(Array.isArray(photoId) ? photoId[0] : photoId);
            }}
          />
        )}
        <div className="gap-4 columns-1 sm:columns-2 xl:columns-3 2xl:columns-4">
          <div className="relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <Bridge />
            </div>
            <Logo />
            <h1 className="mt-8 mb-4 text-base font-bold tracking-widest uppercase">
              2022 Event Photos
            </h1>
            <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
              Our incredible Next.js community got together in San Francisco for our
              first ever in-person conference!
            </p>
            <a
              className="z-10 px-3 py-2 mt-6 text-sm font-semibold text-black transition bg-white border border-white rounded-lg pointer hover:bg-white/10 hover:text-white md:mt-4"
              href="https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-cloudinary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Clone and Deploy
            </a>
          </div>
          {images.map(({ id, public_id, format, blurDataUrl }) => (
            <Link
              key={id}
              href={`/?photoId=${id}`}
              as={`/p/${id}`}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="relative block w-full mb-5 after:content group cursor-zoom-in"
            >
              <Image
                alt="Next.js Conf photo"
                className="rounded-lg brightness-90 will-change-auto group-hover:brightness-110"
                placeholder="blur"
                blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </Link>
          ))}
        </div>
      </main>
      <footer className="p-6 text-center text-white/80 sm:p-12">
        Thank you to{" "}
        <a href="https://edelsonphotography.com/" target="_blank" className="font-semibold hover:text-white" rel="noopener noreferrer">
          Josh Edelson
        </a>,{" "}
        <a href="https://www.newrevmedia.com/" target="_blank" className="font-semibold hover:text-white" rel="noopener noreferrer">
          Jenny Morgan
        </a>, and{" "}
        <a href="https://www.garysextonphotography.com/" target="_blank" className="font-semibold hover:text-white" rel="noopener noreferrer">
          Gary Sexton
        </a>{" "}for the pictures.
      </footer>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by("public_id", "desc")
    .max_results(400)
    .execute();

  const images: ImageProps[] = results.resources.map((image: CloudinaryResource, index: number) => ({
    id: index,
    height: image.height,
    width: image.width,
    public_id: image.public_id,
    format: image.format,
  }));

  const blurImagePromises = images.map((image) => getBase64ImageUrl(image));
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

  images.forEach((image, index) => {
    image.blurDataUrl = imagesWithBlurDataUrls[index];
  });

  return {
    props: {
      images,
    },
  };
}
