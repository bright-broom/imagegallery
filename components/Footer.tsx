// =============================
// 📌 外部ライブラリのインポート
// =============================
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

// =============================
// 📌 内部コンポーネントのインポート（修正済み）
// =============================
import { Icons } from "./ui/icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

// =============================
// 📌 フッターコンポーネント
// =============================
const Footer = () => {
  return (
    <footer className="py-12 bg-background">
      <div className="container px-4 mx-auto md:px-6">
        {/* 📌 ロゴエリア */}
        <div className="flex flex-col items-center">
          <div className="p-8 mb-8 rounded-full bg-primary/10">
            <Icons.logo className="w-6" />
          </div>

          {/* 📌 ナビゲーションメニュー */}
          <nav className="flex flex-wrap justify-center gap-6 mb-8">
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/services">Services</FooterLink>
            <FooterLink href="/products">Products</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </nav>

          {/* 📌 SNS リンク */}
          <div className="flex mb-8 space-x-4">
            <SocialButton icon={Facebook} label="Facebook" />
            <SocialButton icon={Twitter} label="Twitter" />
            <SocialButton icon={Instagram} label="Instagram" />
            <SocialButton icon={Linkedin} label="LinkedIn" />
          </div>

          {/* 📌 メール購読フォーム */}
          <NewsletterSubscription />

          {/* 📌 著作権表記 */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Your Company. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// =============================
// 📌 フッターのナビゲーションリンク
// =============================
const FooterLink = ({ href, children }: { href: string; children: string }) => (
  <Link href={href} className="hover:text-primary">
    {children}
  </Link>
);

// =============================
// 📌 SNSボタンコンポーネント
// =============================
const SocialButton = ({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) => (
  <Button variant="outline" size="icon" className="rounded-full">
    <Icon className="w-4 h-4" />
    <span className="sr-only">{label}</span>
  </Button>
);

// =============================
// 📌 ニュースレター登録コンポーネント
// =============================
const NewsletterSubscription = () => (
  <div className="w-full max-w-md mb-8">
    <form className="flex space-x-2">
      <div className="flex-grow">
        <Label htmlFor="email" className="sr-only">Email</Label>
        <Input id="email" placeholder="Enter your email" type="email" className="rounded-full" />
      </div>
      <Button type="submit" className="rounded-full">Subscribe</Button>
    </form>
  </div>
);
