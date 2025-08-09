"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/lib/validation";
import { useAuth } from "@/hooks/useAuth";
import Input from "@/components/UI/Input/Input";
import Button from "@/components/UI/Button/Button";
import styles from "./auth.module.scss";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, SplitText);

export default function AuthPage() {

  useGSAP(() => {
    let mySplitText = SplitText.create('.gsap-p-animation',{
      type: 'chars'
    })
    gsap.from(mySplitText.chars,{
      opacity:0,
      stagger:0.1,
      duration:3,
      ease: "power1.inOut"
    })
    gsap.from('.gsap-form-animation',{
      y:600,
      opacity:0,
      ease: 'power3.out',
      duration: 2
    })
  }, [])

  const { login, loading } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => login(data);

  return (
    <div className={styles.container}>
      <p className={`${styles.p} gsap-p-animation`}>Hellow welcome</p>
      <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} gsap-form-animation`}>
        <h1>Login</h1>
        <Input
          label="Phone Number"
          placeholder="09xxxxxxxxx"
          {...register("phone")}
          error={errors.phone?.message}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
