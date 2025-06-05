import type { AnyFieldApi } from "@tanstack/react-form";

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <div className="text-[0.8rem] text-destructive">
      {field.state.meta.isTouched && field.state.meta.errors ? <p>{field.state.meta.errors.join(", ")}</p> : null}
    </div>
  );
}
