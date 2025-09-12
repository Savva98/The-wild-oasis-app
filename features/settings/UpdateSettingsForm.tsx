import React from "react";
import { Form } from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useGetSettings from "./getSettings";
import Spinner from "../../ui/Spinner";
import useUpdateSetting from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { data, isPending } = useGetSettings();
  const { updateSetting, isPending: loadingUpdate } = useUpdateSetting();
  const { maximumGuests, maximumNights, breakfastPrice, minimumNights, _id } =
    data || {};
  if (isPending) <Spinner />;
  function handleUpdate(
    e: React.FocusEvent<HTMLInputElement, Element>,
    field: string
  ) {
    const value = e.target.value;
    if (value === "") {
      return;
    }
    const newSetting = {
      [field]: Number(value),
      _id,
    };
    updateSetting(newSetting);
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minimumNights}
          disabled={loadingUpdate}
          onBlur={(e) => handleUpdate(e, "minimumNights")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maximumNights}
          disabled={loadingUpdate}
          onBlur={(e) => handleUpdate(e, "maximumNights")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maximumGuests}
          disabled={loadingUpdate}
          onBlur={(e) => handleUpdate(e, "maximumGuests")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={loadingUpdate}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
