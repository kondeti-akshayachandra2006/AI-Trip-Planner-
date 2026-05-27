import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Users, MessageCircle, Calendar, DollarSign } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';

const members = [
  { id: 1, name: 'Sarah Chen', avatar: '👩', status: 'Confirmed' },
  { id: 2, name: 'Mike Ross', avatar: '👨', status: 'Confirmed' },
  { id: 3, name: 'Emma Wilson', avatar: '👩', status: 'Pending' },
  { id: 4, name: 'John Doe', avatar: '👨', status: 'Confirmed' },
];

export default function GroupTripCollaboration() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen w-full bg-background pb-24">
      <div className="bg-gradient-to-r from-primary to-secondary p-6 pb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-white font-bold">Paris Group Trip</h1>
              <p className="text-white/80 text-sm">4 travelers</p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/group/${id}/chat`)}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <MessageCircle className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-3">
          <GlassCard className="text-center">
            <Calendar className="w-5 h-5 text-primary mx-auto mb-1" />
            <div className="font-bold">Jun 15</div>
            <div className="text-xs text-muted-foreground">Departure</div>
          </GlassCard>
          <GlassCard className="text-center">
            <Users className="w-5 h-5 text-primary mx-auto mb-1" />
            <div className="font-bold">4</div>
            <div className="text-xs text-muted-foreground">Travelers</div>
          </GlassCard>
          <GlassCard className="text-center">
            <DollarSign className="w-5 h-5 text-primary mx-auto mb-1" />
            <div className="font-bold">$2.4k</div>
            <div className="text-xs text-muted-foreground">Per Person</div>
          </GlassCard>
        </div>

        <div>
          <h2 className="font-bold mb-3">Group Members</h2>
          <div className="space-y-3">
            {members.map((member) => (
              <GlassCard key={member.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl">
                      {member.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold">{member.name}</h3>
                      <p className={`text-sm ${
                        member.status === 'Confirmed' ? 'text-green-500' : 'text-orange-500'
                      }`}>
                        {member.status}
                      </p>
                    </div>
                  </div>
                  <button className="text-primary">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="lg"
          className="w-full"
        >
          Invite More Friends
        </Button>

        <div>
          <h2 className="font-bold mb-3">Shared Itinerary</h2>
          <GlassCard onClick={() => navigate(`/itinerary/${id}`)} className="cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold mb-1">4-Day Paris Adventure</h3>
                <p className="text-sm text-muted-foreground">12 activities planned</p>
              </div>
              <Calendar className="w-6 h-6 text-primary" />
            </div>
          </GlassCard>
        </div>

        <Button
          variant="gradient"
          size="lg"
          className="w-full"
          onClick={() => navigate(`/group/${id}/chat`)}
        >
          Open Group Chat
        </Button>
      </div>
    </div>
  );
}
