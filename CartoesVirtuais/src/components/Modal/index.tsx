import { ModalProps } from "@/@types"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { useState } from "react"


export const Modal = ({ isOpen, title, description, onClick }: ModalProps) => {



    return (
        <Dialog open={isOpen}>
            {/* <DialogTrigger>Oper</DialogTrigger> */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                        <Button 
                            type="button" 
                            variant="secondary"
                            onClick={onClick}
                        >
                            Fechar
                        </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}