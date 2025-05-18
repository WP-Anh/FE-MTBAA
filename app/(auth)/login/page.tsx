"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/app/ui/components/buttons/Button";
import Input from "@/app/ui/components/forms/Input";
import { login } from "@/app/services/auth";
import { StoreContext } from "@/app/store/StoreProvider";

export default function LoginPage() {
  const store = useContext<any>(StoreContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Set pending state
    store.login.setData({
      ...store.login.data,
      isPending: true,
      isFetched: false,
      isSuccess: false,
      isError: false,
    });

    const response = await login({
      email: formData.email,
      password: formData.password,
    });

    // Log response for debugging
    console.log("Login Response:", response.data);

    // Update store with response
    store.login.setData(response);

    if (response.isSuccess && response.data?.token) {
      // Lưu token tùy theo lựa chọn "Ghi nhớ đăng nhập"
      if (rememberMe) {
        localStorage.setItem("token", response.data.token);
      } else {
        sessionStorage.setItem("token", response.data.token);
      }

      // Chuyển hướng về trang chủ
      console.log(response);

      // router.push("/");
    } else {
      // Log error if login failed
      console.error("Login failed:", response.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Đăng nhập vào tài khoản
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Hoặc{" "}
            <Link
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              đăng ký tài khoản mới
            </Link>
          </p>
        </div>

        {store.login.data.isError && (
          <div
            className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{store.login.data.message}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <Input
              label="Email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="example@email.com"
              disabled={store.login.data.isPending}
            />
            <Input
              label="Mật khẩu"
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="••••••••"
              disabled={store.login.data.isPending}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={store.login.data.isPending}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Ghi nhớ đăng nhập
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </div>

          <Button type="submit" fullWidth disabled={store.login.data.isPending}>
            {store.login.data.isPending ? "Đang xử lý..." : "Đăng nhập"}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Hoặc đăng nhập với
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="w-full"
              disabled={store.login.data.isPending}
            >
              <Image
                src="/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              disabled={store.login.data.isPending}
            >
              <Image
                src="/facebook.svg"
                alt="Facebook"
                width={20}
                height={20}
                className="mr-2"
              />
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
