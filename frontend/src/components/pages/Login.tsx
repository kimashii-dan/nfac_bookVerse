import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";
import { loginSchema } from "../../lib/auth-schema";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../helpers/api";
import { TokenResponse } from "../../types";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "sonner";

export default function Login() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { setAuth, removeAuth } = useAuth();

  const { isSubmitting } = form.formState;
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data: TokenResponse) => {
      toast("Login is successfull", {
        description: "You are logged in now",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      setAuth(data);
    },
    onError: (error) => {
      toast("Login error", {
        description: error.message,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      removeAuth();
    },
  });

  async function onSubmit(formData: z.infer<typeof loginSchema>) {
    mutation.mutate(formData);
  }

  return (
    <Card className="w-80 md:w-96">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Welcome back! Please sign in to continue.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={48} />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex gap-2">
        <p className="text-sm md:text-base">Don't have an account yet?</p>
        <Link to="/register" className="text-blue-300">
          Register
        </Link>
      </CardFooter>
    </Card>
  );
}
