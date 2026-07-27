const VoteCounter = ({ value }: { value: number }) => {
  return (
    <div className="py-0.5 bg-primary text-primary-foreground text-center text-sm">
      <p aria-label="voting score">
        {value > 0 && '+'}
        {value}
      </p>
    </div>
  );
};

export default VoteCounter;
