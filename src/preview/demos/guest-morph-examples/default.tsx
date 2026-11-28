"use client";

import { GuestMorph, type Guest } from "@/components/custom/blocks/GuestMorphBlock";

const photo = (path: string) =>
  `https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/${path}`;

export const GUESTS: Guest[] = [
  {
    id: "1",
    name: "Ana Watson",
    note: "Hosting",
    status: "going",
    avatar: photo("v1790145139/pexels-photo-1036623-1790145143487.jpg"),
  },
  {
    id: "2",
    name: "Tom Hardy",
    note: "Bringing a plus-one",
    status: "going",
    avatar: photo("v1790145142/pexels-photo-2043590-1790145143488.jpg"),
  },
  {
    id: "3",
    name: "Mara Jade",
    note: "Vegetarian",
    status: "going",
    avatar: photo("v1790145139/pexels-photo-1587009-1790145143488.jpg"),
  },
  {
    id: "4",
    name: "Leo Silva",
    note: "Might be late",
    status: "maybe",
    since: "12m",
    avatar: photo("v1790145139/pexels-photo-3775534-1790145143488.jpg"),
  },
  {
    id: "5",
    name: "June Carter",
    note: "Waiting on a flight",
    status: "maybe",
    since: "40m",
    avatar: photo("v1790082180/pexels-photo-1520760-1790082180553.jpg"),
  },
];

export default function LaunchParty() {
  return (
    <GuestMorph
      title="Launch party"
      guests={GUESTS}
      onInvite={(email) => console.log("Invited", email)}
    />
  );
}
