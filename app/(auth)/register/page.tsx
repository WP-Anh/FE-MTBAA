"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/app/ui/components/buttons/Button";
import Input from "@/app/ui/components/forms/Input";
import { register } from "@/app/services/auth";
import { StoreContext } from "@/app/store/StoreProvider";

export default function RegisterPage() {
  const store = useContext<any>(StoreContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    if (errors.length > 0) {
      store.register.setData({
        data: null,
        isPending: false,
        isFetched: true,
        isSuccess: false,
        isError: true,
        message: errors.join(", "),
      });
      return;
    }

    // Set pending state
    store.register.setData({
      ...store.register.data,
      isPending: true,
      isFetched: false,
      isSuccess: false,
      isError: false,
    });

    try {
      // Log request data
      console.log("Register request data:", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      const response = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // Log response
      console.log("Register response:", response);

      store.register.setData(response);

      if (response.isSuccess) {
        router.push("/login?registered=true");
      }
    } catch (error: any) {
      // Log error details
      console.error("Register error:", error);

      store.register.setData({
        data: null,
        isPending: false,
        isFetched: true,
        isSuccess: false,
        isError: true,
        message:
          error.message || "Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.",
      });
    }
  };

  const validateForm = () => {
    const errors = [];
    if (formData.username.length < 3) {
      errors.push("Tên người dùng phải có ít nhất 3 ký tự");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push("Email không hợp lệ");
    }
    if (formData.password.length < 6) {
      errors.push("Mật khẩu phải có ít nhất 6 ký tự");
    }
    if (formData.password !== formData.confirmPassword) {
      errors.push("Mật khẩu xác nhận không khớp");
    }
    return errors;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Tạo tài khoản mới
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Hoặc{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              đăng nhập vào tài khoản có sẵn
            </Link>
          </p>
        </div>

        {store.register.data.isError && (
          <div
            className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">
              {store.register.data.message}
            </span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <Input
              label="Họ và tên"
              type="text"
              required
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="Nguyễn Văn A"
              disabled={store.register.data.isPending}
            />
            <Input
              label="Email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="example@email.com"
              disabled={store.register.data.isPending}
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
              disabled={store.register.data.isPending}
            />
            <Input
              label="Xác nhận mật khẩu"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="••••••••"
              disabled={store.register.data.isPending}
            />
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              disabled={store.register.data.isPending}
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              Tôi đồng ý với{" "}
              <Link
                href="/terms"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Điều khoản sử dụng
              </Link>{" "}
              và{" "}
              <Link
                href="/privacy"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Chính sách bảo mật
              </Link>
            </label>
          </div>

          <Button
            type="submit"
            fullWidth
            disabled={store.register.data.isPending}
          >
            {store.register.data.isPending ? "Đang xử lý..." : "Đăng ký"}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Hoặc đăng ký với
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="w-full"
              disabled={store.register.data.isPending}
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
              disabled={store.register.data.isPending}
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
