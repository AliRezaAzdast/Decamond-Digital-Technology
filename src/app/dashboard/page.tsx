"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import styles from "./dashboard.module.scss";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, SplitText);

export default function DashboardPage() {
  const { getUser, logout } = useAuth();
  const user = getUser();

  useEffect(() => {
    if (!user) {
      window.location.href = "/auth";
    }
  }, [user]);

  if (!user) return null;


  useGSAP(() => {
    let mySplitText = SplitText.create('.gsap-h1-animation', {
      type: 'chars'
    })
    gsap.from(mySplitText.chars, {
      opacity: 0,
      stagger: 0.1,
      duration: 3,
      ease: "power1.inOut"
    })
    gsap.from('.gsap-button-animation', {
      y: 600,
      opacity: 0,
      ease: 'power3.out',
      duration: 2
    })
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.div}>
        <img src={user.picture.medium} alt="" />
        <h1 className='gsap-h1-animation'>Welcome to the Dashboard, {user.name.first}!</h1>
      </div>
      <button className="gsap-button-animation" onClick={logout}>Logout</button>
    </div>
  );
}
