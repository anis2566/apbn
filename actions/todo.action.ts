"use server"

import { db } from "@/lib/db"
import { TodoSchema, TodoSchemaType } from "@/schema/todo.schema"
import { revalidatePath } from "next/cache"

export const CREATE_TODO = async (values: TodoSchemaType) => {
    const {data, success} = TodoSchema.safeParse(values)
    if(!success) {
        throw new Error("Invalid input value")
    }

    await db.todo.create({
        data: {
            ...data
        }
    })

    revalidatePath("/dashboard")

    return {
        success: "Todo created"
    }
}


export const TOGGLE_TODO = async (id: string) => {
    const todo = await db.todo.findUnique({
      where: {
        id,
      },
    });
  
    if (!todo) {
      return {
        error: "Todo not found",
      };
    }
  
    await db.todo.update({
      where: {
        id,
      },
      data: {
        isCompleted: !todo.isCompleted,
      },
    });
  
    revalidatePath("/dashboard");
  
    return {
      success: "Todo updated",
    };
  };


  export const DELETE_TODO = async (id: string) => {
    const todo = await db.todo.findUnique({
      where: {
        id,
      },
    });
  
    if (!todo) {
      return {
        error: "Todo not found",
      };
    }
  
    await db.todo.delete({
      where: {
        id,
      },
    });
  
    revalidatePath("/dashboard");
  
    return {
      success: "Todo deleted",
    };
  };