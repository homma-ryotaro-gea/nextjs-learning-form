import RegistrationForm from "@/components/RegistrationForm";
import { onFormAction, onFormDraftAction } from "@/lib/serveractinos";

export default function Home() {
  return (
    <div className="mx-auto max-w-xl">
      <RegistrationForm
        // onDataAction={onDataAction}
        onFormAction={onFormAction}
        onFormDraftAction={onFormDraftAction}
      />
    </div>
  );
}
