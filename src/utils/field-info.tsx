import type { AnyFieldApi } from "@tanstack/react-form";

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <div className="text-red-500 text-sm">
      {field.state.meta.isTouched && field.state.meta.errors ? <em>{field.state.meta.errors.join(", ")}</em> : null}
    </div>
  );
}
