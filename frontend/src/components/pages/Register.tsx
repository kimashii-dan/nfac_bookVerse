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
import { registerSchema } from "../../lib/auth-schema";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../helpers/api";
import { toast } from "sonner";

export default function Register() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting } = form.formState;

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log(data);
      toast("Register is successfull", {
        description: "You can login now",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      navigate("/login");
    },
    onError: (error) => {
      toast("Registration error", {
        description: error.message,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    },
  });

  async function onSubmit(formData: z.infer<typeof registerSchema>) {
    const { username, password } = formData;
    mutation.mutate({ username, password });
  }

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create your account to get started.</CardDescription>
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password again"
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
        <p>Already have an account?</p>
        <Link to="/login" className="text-blue-300">
          Login
        </Link>
      </CardFooter>
    </Card>
  );
}
