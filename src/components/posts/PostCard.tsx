import { Post } from "@/data/athletes";
import { Dumbbell, Heart, Package } from "lucide-react";

interface PostCardProps {
  post: Post;
  athleteName?: string;
}

const categoryIcons = {
  training: Dumbbell,
  life: Heart,
  gear: Package,
};

const categoryLabels = {
  training: "My Training",
  life: "My Life",
  gear: "My Gear",
};

export const PostCard = ({ post, athleteName }: PostCardProps) => {
  const Icon = categoryIcons[post.category];

  return (
    <article className="glass-card overflow-hidden group transition-all duration-300 hover:border-primary/30 hover:shadow-glow-soft">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        {/* Category badge */}
        <span className="absolute top-3 left-3 px-3 py-1 bg-card/80 backdrop-blur-sm text-foreground text-xs font-medium rounded-full flex items-center gap-1.5">
          <Icon className="h-3 w-3 text-primary" />
          {categoryLabels[post.category]}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        {athleteName && (
          <span className="text-xs text-primary font-medium mb-1 block">
            {athleteName}
          </span>
        )}
        <h3 className="font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {post.description}
        </p>
      </div>
    </article>
  );
};
