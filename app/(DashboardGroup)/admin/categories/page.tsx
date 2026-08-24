import { getCategories } from "@/service/getCategories";
import CategoryForm from "../../_components/CategoryForm";
import CategoryTable from "../../_components/CategoryTable";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Categories</h1>
        <p className="text-sm text-muted-foreground">
          Manage property categories.
        </p>
      </div>

      <CategoryForm />

      <CategoryTable categories={categories} />
    </main>
  );
}
