export default function SubmitLoading() {
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="animate-pulse">
        <div className="h-4 bg-foreground/20 rounded mb-4 w-1/4" />
        <div className="h-10 bg-foreground/20 rounded mb-2 w-1/2" />
        <div className="h-4 bg-foreground/20 rounded mb-8 w-2/3" />
        <div className="h-64 bg-foreground/20 rounded" />
      </div>
    </div>
  )
}
