const ErrorScreen = ({ reset }: { reset: () => void }) => {
  return (
    <div className="p-4 flex flex-col gap-2">
      <div>
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-sm text-muted-foreground">
          An error occured while loading the page
        </p>
      </div>

      <div>
        <button
          onClick={() => reset()}
          className="px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm transition-colors hover:bg-primary/90"
        >
          Refresh the page
        </button>
      </div>
    </div>
  );
};

export default ErrorScreen;
