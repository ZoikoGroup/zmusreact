import GooglePayButton from "../components/GooglePayButton";

export default function Page() {
  return (
    <div className="p-10">
      <h1 className="text-xl font-bold mb-4">Buy Now</h1>
      <GooglePayButton amount={5000} /> {/* $50 */}
    </div>
  );
}