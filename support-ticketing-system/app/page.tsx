"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, LifeBuoy, Clock, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import Services from "@/components/service-section"
import Header from "@/components/header"
import Footer from "@/components/footer"
import SliderSection from "@/components/slidersection"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header></Header>

     
      <main className="flex-grow">
        {/* Slider */}
        <SliderSection></SliderSection>
        {/* Services */}
        <Services />
      </main>
      <Footer></Footer>
    </div>
  )
}

