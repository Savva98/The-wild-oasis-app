import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import { Form } from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { CabinFormType } from "../../types/types";
import useCreateCabin from "./useCreateCabin";
import Spinner from "../../ui/Spinner";
import FormRow from "../../ui/FormRow";
import styled from "styled-components";
import { ModalContext } from "../../ui/Modal";

const Heading = styled.h2`
  font-size: 2.4rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2.4rem;
`;
function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<CabinFormType>();
  const { mutate, isPending } = useCreateCabin();
  const { onClose } = useContext(ModalContext) || {};
  const { errors } = formState;

  if (isPending) {
    return <Spinner />;
  }

  function onSubmit(cabin: CabinFormType) {
    if (cabin.image instanceof FileList) {
      const [file] = cabin.image as FileList;
      cabin.image = file;
    }
    mutate(
      { ...cabin },
      {
        onSuccess: () => {
          onClose?.();
        },
      }
    );

    reset();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onClose && "modal"}>
      <Heading>{"Add new cabin"}</Heading>
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
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variant="secondary" size="small" type="reset" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" size="medium" disabled={isPending}>
          Create new cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
