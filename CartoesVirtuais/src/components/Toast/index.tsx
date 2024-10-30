import { useToast } from "@/hooks/use-toast"

export const useShowToast = () => {
    const { toast } = useToast();
  
    const showToast = (description: string) => {
      toast({
        description: description,
      });
    };
  
    return showToast;
  };
