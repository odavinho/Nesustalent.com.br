import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts, type BlogPost } from '@/lib/blog-posts';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import { BlogPostCard } from '@/components/blog/blog-post-card';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.id === params.slug);

  if (!post) {
    notFound();
  }
  
  const image = PlaceHolderImages.find(p => p.id === post.imageId);
  const authorAvatar = PlaceHolderImages.find(p => p.id === post.authorAvatarId);
  const relatedPosts = blogPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3);


  const getInitials = (name: string) => {
    if (!name) return '';
    const names = name.split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.slice(0, 2).toUpperCase();
  }

  const formattedDate = format(parseISO(post.date), "d 'de' MMMM 'de' yyyy", { locale: pt });

  return (
    <>
      <Header />
      <main className="bg-card py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
                <ArrowLeft size={16} /> Voltar para o blog
            </Link>

          <article className="max-w-4xl mx-auto">
            <header className="mb-8">
              <Badge variant="default" className="mb-4">{post.category}</Badge>
              <h1 className="font-headline text-3xl md:text-5xl font-bold text-foreground mb-4">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {authorAvatar && (
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={authorAvatar.imageUrl} />
                            <AvatarFallback>{getInitials(post.author)}</AvatarFallback>
                        </Avatar>
                        <span>{post.author}</span>
                    </div>
                )}
                <span className="flex items-center gap-1.5"><Calendar size={14}/> {formattedDate}</span>
              </div>
            </header>

            {image && (
              <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8 shadow-lg">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover"
                  data-ai-hint={image.imageHint}
                />
              </div>
            )}

            <div
              className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 mx-auto"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </main>

       {relatedPosts.length > 0 && (
          <section className="bg-background py-16 mt-16">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="font-headline text-3xl font-bold text-center mb-10">Artigos Relacionados</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                      {relatedPosts.map(relatedPost => (
                          <BlogPostCard key={relatedPost.id} post={relatedPost} />
                      ))}
                  </div>
              </div>
          </section>
        )}

      <Footer />
    </>
  );
}
