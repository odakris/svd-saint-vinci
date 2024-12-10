import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useStudents() {
  const { data, error, isLoading, mutate } = useSWR("/api/students", fetcher);

  return {
    students: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useStudent(id: string) {
  const { data, error, isLoading, mutate } = useSWR(id ? `/api/students/${id}` : null, fetcher);

  return {
    student: data,
    isLoading,
    isError: error,
    mutate,
  };
}
