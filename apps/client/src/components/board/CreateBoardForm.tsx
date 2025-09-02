import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../form/Button";
import FormItem from "../form/FormItem";
import Input from "../form/Input";
import Label from "../form/Label";
import FormError from "../form/FormError";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setBoards } from "../../redux/boardSlice";

const schema = z.object({
  name: z.string().min(3, { message: "min 3 chars long" }),
});

type FormFileds = z.infer<typeof schema>;

const CreateBoardForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFileds>({
    resolver: zodResolver(schema),
  });
  const boards = useAppSelector((root) => root.board.boards);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormFileds> = (data) => {
    axios.post("board", data).then((res) => {
      if (res.data != null) {
        dispatch(setBoards([...boards, res.data]));
        reset();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <Button>Create New Board</Button>
    </form>
  );
};

export default CreateBoardForm;
