"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthContext";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserYearTag } from "@/lib/types";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cetCollegeCode, setCetCollegeCode] = useState("");
  const [yearTag, setYearTag] = useState<UserYearTag | undefined>(undefined);
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) {
      // This basic validation is handled by the toast in AuthContext
      return;
    }
    const success = await signup(username, email, password, cetCollegeCode || undefined, yearTag); // Pass yearTag
    if (success) {
      navigate("/college-finder");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-60px)] p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold gradient-text">Sign Up</CardTitle>
          <CardDescription>
            Create your CET-COMPASS account to get personalized college insights.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="John Doe"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="yearTag">Your Academic Year (Optional)</Label>
              <Select value={yearTag} onValueChange={(value: UserYearTag) => setYearTag(value)}>
                <SelectTrigger id="yearTag">
                  <SelectValue placeholder="Select your academic year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Newcomer">Newcomer</SelectItem>
                  <SelectItem value="FirstYear">First Year</SelectItem>
                  <SelectItem value="SecondYear">Second Year</SelectItem>
                  <SelectItem value="ThirdYear">Third Year</SelectItem>
                  <SelectItem value="FinalYear">Final Year</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                This helps others understand your experience level.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cetCollegeCode">Your CET College Code (Optional, for reviews)</Label>
              <Input
                id="cetCollegeCode"
                type="text"
                placeholder="e.g., EN6006 (COEP)"
                value={cetCollegeCode}
                onChange={(e) => setCetCollegeCode(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                This code helps verify your student status for college reviews.
              </p>
            </div>
            <Button type="submit" className="w-full gradient-button" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Sign Up"
              )}
            </Button>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline text-app-blue hover:text-app-purple">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;