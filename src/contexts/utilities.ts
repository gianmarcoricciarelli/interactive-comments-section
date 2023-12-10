import { DateTime } from "luxon";
import type { CommentsData } from "../types/types";

export function formatDataTimestamps(data: CommentsData): CommentsData {
    const cloneCommentsData = structuredClone(data);

    cloneCommentsData.comments[0].createdAt = DateTime.now().minus({ month: 1 }).toLocaleString();
    cloneCommentsData.comments[1].createdAt = DateTime.now().minus({ weeks: 2 }).toLocaleString();

    if (cloneCommentsData.comments[1].replies !== undefined) {
        cloneCommentsData.comments[1].replies[0].createdAt = DateTime.now()
            .minus({ weeks: 1 })
            .toLocaleString();
        cloneCommentsData.comments[1].replies[1].createdAt = DateTime.now()
            .minus({ days: 2 })
            .toLocaleString();
    }

    return cloneCommentsData;
}
