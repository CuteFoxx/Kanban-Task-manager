import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import Button from "../form/Button";
import FormItem from "../form/FormItem";
import Input from "../form/Input";
import Label from "../form/Label";
import FormError from "../form/FormError";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setBoards, setCurrentBoard } from "../../redux/boardSlice";
import RemoveIcon from "../../assets/icon-cross.svg?react";
import { useEffect } from "react";
const schema = z.object({
  name: z.string().min(3, { message: "min 3 chars long" }),
  columns: z.array(
    z.object({
      name: z.string().min(3, { message: "min 3 chars long" }),
    }),
  ),
});

type FormFileds = z.infer<typeof schema>;

const BoardForm = ({
  defaultValues,
  action = "POST",
}: {
  defaultValues?: FormFileds;
  action?: "POST" | "UPDATE";
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormFileds>({
    defaultValues:
      defaultValues != null
        ? defaultValues
        : {
            columns: [{ name: "" }],
          },
    resolver: zodResolver(schema),
  });
  const boards = useAppSelector((root) => root.board.boards);
  const dispatch = useAppDispatch();
  const currentBoard = useAppSelector((root) => root.board.currentBoard);

  const { fields, append, remove } = useFieldArray({
    name: "columns",
    control: control,
  });

  const onSubmit: SubmitHandler<FormFileds> = (data) => {
    switch (action) {
      case "POST":
        axios.post("board", data).then((res) => {
          if (res.data != null) {
            dispatch(setBoards([...boards, res.data]));
            reset();
          }
        });
        break;
      case "UPDATE":
        axios.patch(`board/${currentBoard?.id ?? -1}`, data).then((res) => {
          if (res.data != null) {
            dispatch(setCurrentBoard(res.data));
            reset();
          }
        });
        break;
    }
  };

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <FormItem>
        <Label>Board Name</Label>
        <Input
          {...register("name")}
          type="text"
          name="name"
          placeholder="e.g. Web Design"
        />
        {errors.name && <FormError>{errors.name.message}</FormError>}
      </FormItem>
      <FormItem className="mt-6">
        <Label>Board Columns</Label>
        <div className="flex flex-col gap-3">
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="flex items-center gap-4">
                <Input
                  placeholder="Column name"
                  type="text"
                  {...register(`columns.${index}.name`)}
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    data-ignore-outside
                  >
                    <RemoveIcon />
                  </button>
                )}
              </div>
            );
          })}
          <Button
            intent={"light"}
            className="mt-0"
            type="button"
            onClick={() => append({ name: "" })}
          >
            + Add New Column
          </Button>
        </div>
      </FormItem>
      <Button>{action == "POST" ? "Create New Board" : "Save Changes"}</Button>
    </form>
  );
};

export default BoardForm;
