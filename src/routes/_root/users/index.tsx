import TableComponent from "@/components/table-component";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_root/users/")({
  component: RouteComponent,
});

const data = [
  { id: 1, name: "John", age: 30 },
  { id: 2, name: "Jane", age: 25 },
];

const columns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "age", header: "Age" },
];

function RouteComponent() {
  return <TableComponent data={data} columns={columns} />;
}
