"use client";
import Main from "@/pages/Main";
import { Suspense } from "react";

export default function Home() {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<Main />;
		</Suspense>
	);
}
