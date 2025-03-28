'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SelectIcon } from './SelectIcon'
import { PlusCircle } from 'lucide-react'

export function NewCategory({ createCategory, setIcon, setName, name, icon }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          variant="outline"
          className="flex justify-between border rounded-lg p-2 bg-stone-50 text-start "
        >
          <div>New category</div>
          <PlusCircle className="text-black" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New category</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              onChange={(event) => setName(event.target.value)}
              id="name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              Icon
            </Label>
            <SelectIcon setIcon={setIcon} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <div>
              <Button
                as="span"
                className={'bg-blue-500 hover:bg-green-500'}
                disabled={!name || !icon}
                onClick={createCategory}
              >
                Save category
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
