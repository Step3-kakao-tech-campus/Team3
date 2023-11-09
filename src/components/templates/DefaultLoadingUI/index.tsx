import LoadingSpinner from "@/components/atoms/LoadingSpinner";

function DefaultLoadingUI() {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <LoadingSpinner styleType="xl" />
    </div>
  );
}

export default DefaultLoadingUI;
