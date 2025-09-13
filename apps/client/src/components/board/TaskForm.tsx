import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  Controller,
  useFieldArray,
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import { z } from "zod";
import FormItem from "../form/FormItem";
import Label from "../form/Label";
import Input from "../form/Input";
import Button from "../form/Button";
import TextArea from "../form/TextArea";
import FormError from "../form/FormError";
import Select, { type Option } from "../form/Select";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import RemoveIcon from "../../assets/icon-cross.svg?react";
import axios from "axios";
import { setTasks } from "../../redux/tasksSlice";

const schema = z.object({
  title: z.string().min(3, { message: "min 3 chars long" }),
  description: z.string().min(15, { message: "min 15 chars long" }),
  status: z.string(),
  subtasks: z.array(
    z.object({
      name: z.string().min(3, { message: "min 3 chars long" }),
    }),
  ),
});

type FormFileds = z.infer<typeof schema>;

const TaskForm = ({
  defaultValues,
  action = "POST",
  taskId = -1,
}: {
  defaultValues?: FormFileds;
  action?: "POST" | "UPDATE";
  taskId?: number;
}) => {
  const [options, setOptions] = useState<Option[]>();
  const tasks = useAppSelector((root) => root.tasks.value);
  const dispatch = useAppDispatch();
  const currentBoard = useAppSelector((root) => root.board.currentBoard);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    getValues,
  } = useForm<FormFileds>({
    resolver: zodResolver(schema),
    defaultValues:
      defaultValues != null
        ? defaultValues
        : {
            status: options?.[0].value ?? "",
            subtasks: [
              {
                name: "",
              },
            ],
          },
  });

  useEffect(() => {
    if (currentBoard?.columns != null) {
      const options: { label: string; value: string }[] =
        currentBoard.columns?.map((item) => {
          return { label: item.name, value: String(item.id) };
        });
      reset({
        ...getValues(),
        status: options[0].value,
      });
      setOptions(options);
    }
  }, [currentBoard, reset]);

  const onSubmit: SubmitHandler<FormFileds> = (data) => {
    switch (action) {
      case "POST":
        axios
          .post("task", { ...data, columnId: parseInt(data.status) })
          .then((res) => {
            if (tasks != null) {
              dispatch(setTasks([...tasks, res.data]));
              reset();
            }
          });
        break;
      case "UPDATE":
        axios.patch(`task/${taskId}`, data).then((res) => {
          if (tasks != null) {
            const filtered = tasks.filter((task) => task.id != res.data.id);
            dispatch(setTasks([...filtered, res.data]));
          }
        });
        break;
    }
  };

  const { fields, append, remove } = useFieldArray({
    name: "subtasks",
    control: control,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-6"
    >
      <FormItem>
        <Label htmlFor="task-title">Title</Label>
        <Input
          {...register("title")}
          type="text"
          id="task-title"
          placeholder="e.g. Take coffee break"
        />
        {errors.title && <FormError>{errors.title.message}</FormError>}
      </FormItem>
      <FormItem>
        <Label htmlFor="task-description">Description</Label>
        <TextArea
          {...register("description")}
          id="task-description"
          placeholder={`e.g. It’s always good to take a break. This 
15 minute break will  recharge the batteries 
a little.`}
        />
        {errors.description && (
          <FormError>{errors.description.message}</FormError>
        )}
      </FormItem>
      <FormItem>
        <Label>Subtasks</Label>
        <div className="flex flex-col gap-3">
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="flex items-center gap-4">
                <Input
                  placeholder="e.g. Make coffee"
                  type="text"
                  {...register(`subtasks.${index}.name`)}
                />

                <button
                  type="button"
                  onClick={() => remove(index)}
                  data-ignore-outside
                >
                  <RemoveIcon />
                </button>
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
      <FormItem>
        <Label htmlFor="task-status">Status</Label>
        {options && (
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={field.onChange}
                options={options}
              />
            )}
          />
        )}
      </FormItem>
      <Button>{action == "POST" ? "Create Task" : "Save changes"}</Button>
    </form>
  );
};

export default TaskForm;
