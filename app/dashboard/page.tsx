"use client";
import { Separator } from "@/components/ui/separator";
import { TypographyH2, TypographyH4, TypographyP } from "@/components/ui/typography";
import { db } from "@/lib/firebase/firestore";
import { type PetWithId } from "@/lib/firebase/schema";
import { collection, onSnapshot, query } from "firebase/firestore";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "../(context)/auth-context";
import AddPetForm from "./add-pet-form";
import PetsTable from "./pets-table";

export default function Dashboard() {
  const { user } = useAuthContext();

  const [pets, setPets] = useState<"loading" | "error" | PetWithId[]>("loading");
  useEffect(() => {
    // What we're asking for
    const q = query(collection(db, "pets"));
    // Start listening to Firestore (set up a snapshot)
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        // * The main Firestore query logic happens here!
        // Obtain array of documents from snapshot
        const docs = snapshot.docs;
        // Map the array of documents to an array of PetWithId objects
        const petWithIdList = docs.map((doc) => ({ ...doc.data(), id: doc.id }) as PetWithId);
        // Update the pets state variable with the PetWithId[] array
        setPets(petWithIdList);
      },
      (error) => {
        console.log(error.message);
        setPets("error");
      },
    );
    // Stop listening when the component is unmounted
    return unsubscribe;
  }, []);

  let petsSection;
  if (pets === "loading") {
    petsSection = <p>Loading pets...</p>;
  } else if (pets === "error") {
    petsSection = <p>There was an error fetching pets</p>;
  } else {
    petsSection = <PetsTable pets={pets} />;
  }

  if (!user) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  if (user === "loading") {
    return <TypographyP>Loading...</TypographyP>;
  }

  return (
    <>
      <TypographyH2>Pets Dashboard</TypographyH2>
      <TypographyH4>Add New Pet</TypographyH4>
      <AddPetForm />
      <Separator className="my-4" />
      <TypographyH4>Pets Table</TypographyH4>
      {petsSection}
    </>
  );
}
