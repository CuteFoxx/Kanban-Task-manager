import z from "zod";
import Button from "../form/Button";
import FormError from "../form/FormError";
import FormItem from "../form/FormItem";
import Input from "../form/Input";
import Label from "../form/Label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import axios from "axios";
import { setCurrentBoard } from "../../redux/boardSlice";

const schema = z.object({
  name: z.string().min(3, { message: "min 3 chars long" }),
});

type FormFileds = z.infer<typeof schema>;

const AddColumnForm = () => {
  const currentBoard = useAppSelector((root) => root.board.currentBoard);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFileds>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFileds> = (data) => {
    if (currentBoard != null && currentBoard.columns != null) {
      axios
        .post("column", { ...data, boardId: currentBoard.id })
        .then((res) => {
          if (res.data) {
            dispatch(
              setCurrentBoard({
                ...currentBoard,
                columns: [...(currentBoard.columns ?? []), res.data],
              }),
            );
            reset();
          }
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-6"
    >
      <FormItem>
        <Label htmlFor="column-name">Column name</Label>
        <Input
          {...register("name")}
          type="text"
          id="column-name"
          placeholder="e.g. Take coffee break"
        />
        {errors.name && <FormError>{errors.name.message}</FormError>}
      </FormItem>
      <Button>Create Task</Button>
    </form>
  );
};

export default AddColumnForm;
