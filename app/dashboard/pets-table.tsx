import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type PetWithId } from "@/lib/firebase/schema";
import { Trash2 } from "lucide-react";

// TODO: Update deletePet to remove a pet from the db given its id
const deletePet = (id: string) => {
  console.log(id);
};

export default function PetsTable({ pets }: { pets: PetWithId[] }) {
  return (
    <Table>
      <TableCaption>A list of pets.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Alive?</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pets.map((pet) => (
          <TableRow key={pet.id}>
            <TableCell>{pet.name}</TableCell>
            <TableCell>{pet.age}</TableCell>
            <TableCell>{pet.isAlive ? "Yes" : "No"}</TableCell>
            <TableCell>
              <Button variant="outline" size="icon" onClick={() => deletePet(pet.id)}>
                <Trash2 />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
