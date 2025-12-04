import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export function MarketplaceButton({ label, href }) {
  return (
    <Button
        asChild
        className="
            w-full py-5 text-base font-medium rounded-2xl
  bg-[#EE4D2D] text-white shadow-md hover:shadow-xl
  hover:brightness-110 hover:scale-[1.02] transition-all duration-300
        "
        >
        <a href={href} target="_blank">
            <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            {label}
            </div>
        </a>
    </Button>

  )
}
