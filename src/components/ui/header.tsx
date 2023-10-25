'use client'

import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCartIcon,
} from 'lucide-react'
import { Button } from './button'
import { Card } from './card'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from './sheet'
import { Separator } from './separator'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import Link from 'next/link'
import Cart from './cart'

const Header = () => {
  const { status, data } = useSession()

  const handleLoginClick = async () => {
    await signIn()
  }

  const handleLogoutClick = async () => {
    await signOut()
  }

  return (
    <Card className="flex items-center justify-between p-[1.875rem]">
      {/* Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>
          {status === 'authenticated' && data?.user && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 py-4">
                <Avatar>
                  <AvatarFallback>
                    {data.user.name?.[0].toUpperCase()}
                  </AvatarFallback>

                  {data.user.image && <AvatarImage src={data.user.image} />}
                </Avatar>

                <div className="flex flex-col truncate">
                  <p className="font-medium">{data.user.name}</p>
                  <p className="truncate text-sm opacity-75">
                    {data.user.email}
                  </p>
                </div>
              </div>
              <Separator />
            </div>
          )}

          <div className="mt-2 flex flex-col space-y-2">
            <SheetClose asChild>
              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <HomeIcon size={16} />
                  Início
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="/deals">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <PercentIcon size={16} />
                  Ofertas
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="/catalog">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <ListOrderedIcon size={16} />
                  Catálogo
                </Button>
              </Link>
            </SheetClose>

            <Separator />

            {status === 'unauthenticated' && (
              <Button
                variant="secondary"
                className="w-full justify-start gap-2"
                onClick={handleLoginClick}
              >
                <LogInIcon size={16} />
                Fazer login
              </Button>
            )}

            {status === 'authenticated' && (
              <Button
                variant="secondary"
                className="w-full justify-start gap-2"
                onClick={handleLogoutClick}
              >
                <LogOutIcon size={16} />
                Fazer logout
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Header Logo */}
      <Link href="/">
        <h1 className="text-lg font-semibold">
          <span className="text-primary">REACT</span> Store
        </h1>
      </Link>

      {/* Cart */}
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <ShoppingCartIcon />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[350px]">
          <Cart />
        </SheetContent>
      </Sheet>
    </Card>
  )
}

export default Header
