import { useState } from 'react';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  Heart,
  MessageCircle,
  Share2,
  Paperclip,
  Pin,
  Award,
  Megaphone,
  FileText,
} from 'lucide-react';
import { cn } from './ui/utils';

interface NewsPostProps {
  post: {
    id: string;
    author: {
      name: string;
      role: string;
      avatar: string;
    };
    timestamp: string;
    content: string;
    type: 'announcement' | 'policy' | 'spotlight' | 'general';
    image?: string;
    attachment?: {
      name: string;
      type: string;
      size: string;
    };
    likes: number;
    comments: number;
    isPinned?: boolean;
  };
}

export function NewsPost({ post }: NewsPostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const getPostTypeConfig = (type: string) => {
    const configs = {
      announcement: {
        icon: <Megaphone className="h-3.5 w-3.5" />,
        label: 'Announcement',
        color: 'bg-blue-100 text-blue-700 border-blue-200',
      },
      policy: {
        icon: <FileText className="h-3.5 w-3.5" />,
        label: 'Policy Update',
        color: 'bg-purple-100 text-purple-700 border-purple-200',
      },
      spotlight: {
        icon: <Award className="h-3.5 w-3.5" />,
        label: 'Employee Spotlight',
        color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      },
      general: {
        icon: null,
        label: '',
        color: '',
      },
    };
    return configs[type as keyof typeof configs];
  };

  const typeConfig = getPostTypeConfig(post.type);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      {/* Post Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3 flex-1">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <h4 className="text-sm">{post.author.name}</h4>
                {post.isPinned && (
                  <Pin className="h-3.5 w-3.5 text-blue-600 fill-blue-600" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">{post.author.role}</p>
              <p className="text-xs text-muted-foreground">{formatTimestamp(post.timestamp)}</p>
            </div>
          </div>
          {typeConfig.label && (
            <Badge variant="outline" className={cn('gap-1.5', typeConfig.color)}>
              {typeConfig.icon}
              {typeConfig.label}
            </Badge>
          )}
        </div>

        {/* Post Content */}
        <div className="space-y-3">
          <p className="text-sm leading-relaxed whitespace-pre-line">{post.content}</p>

          {/* Post Image */}
          {post.image && (
            <div className="rounded-lg overflow-hidden border">
              <ImageWithFallback
                src={post.image}
                alt="Post image"
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Attachment */}
          {post.attachment && (
            <div className="border rounded-lg p-3 flex items-center gap-3 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Paperclip className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{post.attachment.name}</p>
                <p className="text-xs text-muted-foreground">
                  {post.attachment.type} • {post.attachment.size}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interaction Stats */}
      <div className="px-4 py-2 border-t border-b bg-gray-50">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
            <span>{likesCount} {likesCount === 1 ? 'like' : 'likes'}</span>
          </div>
          <span>{post.comments} {post.comments === 1 ? 'comment' : 'comments'}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-2 flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className={cn(
            'flex-1 gap-2',
            isLiked && 'text-red-600 hover:text-red-700'
          )}
        >
          <Heart className={cn('h-4 w-4', isLiked && 'fill-red-600')} />
          Like
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 gap-2">
          <MessageCircle className="h-4 w-4" />
          Comment
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </div>
    </Card>
  );
}
