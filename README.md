Welcome to a short activity for T4SG's Spring 2024 backend workshop!

To get started, simply clone the repo and run `npm install`. You can then start the webapp with `npm run dev`.

The activity centers around managing a list of pets, each of which has `id`, `name`, `age`, and `isAlive` properties. You can see the schema below, which is also defined in `lib/firebase/schema.ts`.

```typescript
export interface Pet {
  name: string;
  age: number;
  isAlive: boolean;
}
export interface PetWithId extends Pet {
  id: string;
}
```

The data is stored in a Firestore database. Firestore allows you to set up "subscriptions" to listen to data in real time. Setting this up requires some boilerplate code, which we've used in `app/dashboard/page.tsx` to listen to the `pets` collection of documents in the database. Although we won't have time to go through the full boilerplate, the bulk of the query logic is marked for your reference (lines 24-30).

This activity is quite short, and just has two tasks:

1. In `app/dashboard/add-pet-form.tsx`, there is an `addPet()` function that takes in a `pet` object and is supposed to add that pet to the `pets` collection in your Firestore DB. The form logic for inputting the pet data has already been done. *Notice that the function uses the `Pet` interface from `lib/firebase/schema.ts` to type its input. This ensures consistency in the data we are writing to Firebase!*

   **Complete the `addPet()` function to successfully add a new pet to the database.** 

   Once you're done, notice that adding a new pet should update **everyone's** webapp without needing to refresh! This is because we are subscribing to the `pets` collection. Firebase (and some other tools like Supabase) offer this unique subscription functionality that allows us to more easily handle database updates.

2. In `app/dashboard/pets-table.tsx`, there is a `deletePet()` function that takes in a pet's `id` and is supposed to delete the pet with that ID from your Firestore DB. The delete button for each pet in the Pets Table calls `deletePet()` passing in the corresponding pet's ID.

   **Complete the `deletePet()` function to successfully delete pets from the database.**

   Once you're done, again notice that deleting pets updates everyone's webapp without needing to refresh.

Firebase is a good solution for backend databases and authentication that you can use in your own apps. However, keep in mind the following caveats:

1. NoSQL databases such as Firebase are best used when you know exactly how your app should query/manipulate data and that its functionality is not likely to evolve. In NoSQL databases, your database structure is determined by the kinds of queries and updates you need to make, so an app that is likely to have evolving functionality may require many database rewrites over the course of development.
2. Firebase uses a lot of Google-specific logic and is unique in the way its data can be managed. That is, the functions and parameters you can use in Firebase (e.g. Cloud functions, security rules, some query customizations) may not be available in other backend platforms. This leaves your app susceptible to **vendor lock-in**, where it can be very difficult to migrate your app away from Firebase if you ever need a different backend solution. Relational database solutions (e.g. Supabase) have less vendor lock-in because their database and query structure conforms to the widely-accepted SQL standard, making it easier to migrate databases if needed. If possible, we generally recommend relational databases for T4SG's client projects so that the clients can more easily switch our products to more cost-effective database solutions if needed.

Happy coding!
