"use server";

import { db } from "@/lib/db";
import { Role } from "@/schema/scout.schema";
import { Section, UnitSchema, UnitSchemaType } from "@/schema/unit.schema";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const CREATE_UNIT = async (values: UnitSchemaType) => {
  const { success, data } = UnitSchema.safeParse(values);

  if (!success) {
    throw new Error(`Invalid input value`);
  }

  const existingUnit = await db.unit.findFirst({
    where: {
      name: data.name,
      section: data.section,
    },
  });

  if (existingUnit) {
    throw new Error("Unit already exists");
  }

  await db.unit.create({
    data: {
      ...data,
    },
  });

  revalidatePath("/dashboard/unit");

  return {
    success: "Unit created",
  };
};

type UpdateUnit = {
  unit: UnitSchemaType;
  unitId: string;
};

export const UPDATE_UNIT = async ({ unit, unitId }: UpdateUnit) => {
  const isExistUnit = await db.unit.findUnique({
    where: {
      id: unitId,
    },
  });
  if (!isExistUnit) {
    throw new Error("Unit not found");
  }

  await db.unit.update({
    where: {
      id: unitId,
    },
    data: {
      ...unit,
    },
  });

  revalidatePath(`/dashboard/unit/edit/${unitId}`);

  return {
    success: "Unit updated",
  };
};

export const DELETE_UNIT = async (id: string) => {
  const unit = await db.unit.findUnique({
    where: {
      id,
    },
  });
  if (!unit) {
    throw new Error("Unit not found");
  }

  await db.unit.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/unit");

  return {
    success: "Unit deleted",
  };
};

export const GET_UNITS = async (section: Section | undefined) => {
  const units = await db.unit.findMany({
    where: {
      ...(section && { section: section }),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    units,
  };
};


type AssigLeader = {
  unitId: string;
  leaderId: string;
}
export const ASSIGN_LEADER = async ({unitId, leaderId}:AssigLeader) => {
  const unit = await db.unit.findUnique({
    where: {
      id: unitId
    }
  })

  if(!unit) {
    throw new Error("Unit not found")
  }

  const scout = await db.scout.findUnique({
    where: {
      id: leaderId
    },
    include: {
      user: {
        select: {
          clerkId: true
        }
      }
    }
  })

  if(!scout) {
    throw new Error("Scout not found")
  }

  await db.unit.update({
    where: {
      id: unitId
    },
    data: {
      leaderId,
    }
  })

  const updatedScout = await db.scout.update({
    where: {
      id: leaderId
    },
    data: {
      role: scout.role?.includes(Role.ScoutLeader) ? scout?.role : [...scout?.role, Role.ScoutLeader]
    }
  })

  await clerkClient.users.updateUser(scout?.user?.clerkId, {
    publicMetadata: {
      role: updatedScout?.role?.join(" "),
      status: "active"
    }
  })

  revalidatePath(`/dashboard/unit/${unitId}`)

  return {
    success: "Leader assigned"
  }
}


export const REMOVE_LEADER = async (unitId: string) => {
  const unit = await db.unit.findUnique({
    where: {
      id: unitId
    },
    include: {
      leader: {
        include: {
          user: {
            select: {
              clerkId: true
            }
          }
        }
      }
    }
  })

  if(!unit) {
    throw new Error("Unit not found")
  }

  if(unit.leader) {
    await db.scout.update({
      where: {
        id: unit.leader.id
      },
      data: {
        role: unit.leader.role.filter(role => role !== Role.ScoutLeader)
      }
    })

    await clerkClient.users.updateUser(unit.leader.user.clerkId, {
      publicMetadata: {
        role: unit.leader.role.filter(role => role !== Role.ScoutLeader).join(" "),
        status: "active"
      }
    })
  }

  await db.unit.update({
    where: {
      id: unitId
    },
    data: {
      leaderId: null
    }
  })

  revalidatePath(`/dashboard/unit/${unitId}`)

  return {
    success: "Leader removed"
  }
}

export const GET_UNITS_BY_SECTION = async (section: Section) => {
  const units = await db.unit.findMany({
    where: {
      section: section
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return {units}
}


type RemoveScout = {
  scoutId: string;
  unitId: string;
}
export const REMOVE_SCOUT = async ({scoutId, unitId}: RemoveScout) => {
  const scout = await db.scout.findUnique({
    where: {
      id: scoutId
    }
  })

  if(!scout) {
    throw new Error("Scout not found")
  }

  await db.scout.update({
    where: {
      id: scoutId
    },
    data: {
      unitId: null
    }
  })

  revalidatePath(`/dashboard/unit/${unitId}`)

  return {
    success: "Scout removed"
  }
}