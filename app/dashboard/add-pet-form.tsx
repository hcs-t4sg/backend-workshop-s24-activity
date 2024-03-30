import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type Pet } from "@/lib/firebase/schema";
import { useState } from "react";

// TODO: Update addPet() to insert pet into Firebase DB
const addPet = (pet: Pet) => {
  console.log(pet);
};

export default function AddPetForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [isAlive, setIsAlive] = useState(true);

  const handleAdd = () => {
    const newPet = {
      name,
      age,
      isAlive,
    };
    addPet(newPet);
  };

  return (
    <>
      <div className="my-4">
        <Label htmlFor="name">Name</Label>
        <Input className="w-96" id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="my-4">
        <Label htmlFor="age">Age</Label>
        <Input
          className="w-96"
          id="age"
          type="number"
          value={age}
          min="0"
          onChange={(e) => setAge(Number(e.target.value))}
        />
      </div>
      <div className="my-4">
        <Label htmlFor="isAlive">Alive?</Label>
        <RadioGroup value={isAlive ? "yes" : "no"}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="yes" onClick={() => setIsAlive(true)} />
            <Label htmlFor="yes">Yes</Label>
            <RadioGroupItem value="no" id="no" onClick={() => setIsAlive(false)} />
            <Label htmlFor="no">No</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="my-4">
        <Button onClick={handleAdd}>Add</Button>
      </div>
    </>
  );
}
