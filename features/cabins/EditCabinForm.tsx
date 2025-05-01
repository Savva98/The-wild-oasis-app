import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import { Form, Overlay } from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { EditCabinFormType } from "../../types/types";
import useEditCabin from "./useEditCabin";
import Spinner from "../../ui/Spinner";
import FormRow from "../../ui/FormRow";
import styled from "styled-components";

const Heading = styled.h2`
  font-size: 2.4rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2.4rem;
`;
type EditCabinProp = {
  isOpen: boolean;
  onClose: () => void;
  heading?: string;
  cabin: EditCabinFormType;
};

function EditCabinForm({
  isOpen,
  onClose,
  heading = "Add new cabin",
  cabin,
}: EditCabinProp) {
  const { ...cabinData } = cabin;
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<EditCabinFormType>({ defaultValues: cabinData });
  const { mutate, isPending } = useEditCabin();

  const { errors } = formState;
  if (!isOpen) return null;
  if (isPending) {
    return <Spinner />;
  }
  function onSubmit(cabinToAdd: EditCabinFormType) {
    if (cabinToAdd.image instanceof FileList) {
      const [file] = cabinToAdd.image as FileList;
      cabinToAdd.image = file;
    }
    cabinToAdd.id = cabin.id;
    mutate(cabinToAdd);
    reset();
  }

  return (
    <>
      <Overlay onClick={onClose} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading>{heading}</Heading>
        <FormRow label="Cabin name" error={errors.name?.message}>
          <Input
            type="text"
            id="name"
            {...register("name", {
              required: "This field is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters long",
              },
            })}
          />
        </FormRow>

        <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
          <Input
            type="number"
            id="maxCapacity"
            {...register("maxCapacity", {
              required: "This field is required",
              valueAsNumber: true,
              min: {
                value: 1,
                message: "Maximum capacity must be at least 1",
              },
            })}
          />
        </FormRow>

        <FormRow label="Regular price" error={errors.regularPrice?.message}>
          <Input
            type="number"
            id="regularPrice"
            {...register("regularPrice", {
              required: "This field is required",
              valueAsNumber: true,
            })}
          />
        </FormRow>

        <FormRow label="Discount" error={errors.discount?.message}>
          <Input
            type="number"
            id="discount"
            defaultValue={0}
            {...register("discount", {
              required: "This field is required",
              valueAsNumber: true,
              validate: {
                isPositive: (value) => {
                  if (value < 0) {
                    return "Discount must be a positive number";
                  }
                  return true;
                },
                isLessThanRegularPrice: (value) => {
                  if (value > getValues().regularPrice) {
                    return "Discount must be less than regular price";
                  }
                  return true;
                },
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Description for cabin"
          error={errors.description?.message}
        >
          <Textarea
            type="number"
            id="description"
            defaultValue=""
            {...register("description", {
              required: "This field is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters long",
              },
            })}
          />
        </FormRow>

        <FormRow label="Cabin photo">
          <FileInput id="image" accept="image/*" />
        </FormRow>

        <FormRow>
          <Button
            variant="secondary"
            size="small"
            type="reset"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button variant="primary" size="medium" disabled={isPending}>
            Save changes
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default EditCabinForm;
