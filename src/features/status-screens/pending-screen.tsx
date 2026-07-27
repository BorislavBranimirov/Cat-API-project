import { Loader2 } from 'lucide-react';

const PendingScreen = () => {
  return (
    <div className="p-4 flex justify-center">
      <Loader2 className="size-12 animate-spin" />
    </div>
  );
};

export default PendingScreen;
