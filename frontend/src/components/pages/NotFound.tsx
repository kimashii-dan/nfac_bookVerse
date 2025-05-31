import { Frown } from "lucide-react";
import { Card } from "../ui/card";

export default function NotFound() {
  return (
    <div className="message-centered ">
      <Card className="centered-column text-destructive w-fit p-20 border-destructive border-3 shadow-2xl">
        <div className="text-center">
          <h1 className="base:text-7xl text-5xl font-semibold">404</h1>
          <p>Page not found</p>
        </div>

        <Frown size={70} />
      </Card>
    </div>
  );
}
