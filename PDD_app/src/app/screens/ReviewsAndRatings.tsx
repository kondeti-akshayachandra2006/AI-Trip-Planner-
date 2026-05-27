import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ThumbsUp } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';

const reviews = [
  {
    id: 1,
    user: 'Sarah Chen',
    avatar: '👩',
    rating: 5,
    date: 'Apr 15, 2026',
    text: 'Amazing hotel! The views of the Eiffel Tower were breathtaking. Highly recommend!',
    helpful: 24,
  },
  {
    id: 2,
    user: 'Mike Ross',
    avatar: '👨',
    rating: 4,
    date: 'Mar 28, 2026',
    text: 'Great location and service. The room was spacious and clean. Would stay again!',
    helpful: 18,
  },
  {
    id: 3,
    user: 'Emma Wilson',
    avatar: '👩',
    rating: 5,
    date: 'Feb 10, 2026',
    text: 'Perfect for a romantic getaway. The staff went above and beyond to make our stay special.',
    helpful: 31,
  },
];

export default function ReviewsAndRatings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-white font-bold">Reviews & Ratings</h1>
            <p className="text-white/80 text-sm">{reviews.length} reviews</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <GlassCard className="bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-4xl font-bold mb-1">4.8</div>
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">Based on {reviews.length} reviews</div>
            </div>
            <Button variant="gradient" size="sm">
              Write Review
            </Button>
          </div>
        </GlassCard>

        <div>
          <h2 className="font-bold mb-4">Recent Reviews</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <GlassCard key={review.id}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl">
                    {review.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{review.user}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <span>•</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm mb-3">{review.text}</p>
                <button className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ThumbsUp className="w-4 h-4" />
                  Helpful ({review.helpful})
                </button>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
