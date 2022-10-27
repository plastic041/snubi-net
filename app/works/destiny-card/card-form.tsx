"use client";

import { useDestinyItemStore } from "~/stores/destiny-item";
import type { Item } from "~/typings/destiny-item";

export const CardForm = () => {
  const item = useDestinyItemStore();

  return (
    <form className="flex w-full flex-col gap-2 lg:w-80 [&_input]:border [&_input]:p-2 [&_label]:text-lg [&_label]:text-gray-500 [&_label]:dark:text-gray-300">
      <div className="flex flex-col">
        <label htmlFor="name">이름</label>
        <input
          id="name"
          type="text"
          value={item.name}
          onChange={(e) => item.setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="rarity">등급</label>
        <select
          className="unstyled rounded-none border bg-white p-2"
          id="rarity"
          value={item.rarity}
          onChange={(e) => item.setRarity(e.target.value as Item["rarity"])}
        >
          <option value="common">일반</option>
          <option value="uncommon">고급</option>
          <option value="rare">희귀</option>
          <option value="legendary">전설</option>
          <option value="exotic">경이</option>
        </select>
      </div>
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-1 flex-col">
          <label htmlFor="slot">타입</label>
          <select
            className="unstyled rounded-none border bg-white p-2"
            id="slot"
            value={item.slot}
            onChange={(e) => item.setSlot(e.target.value as Item["slot"])}
          >
            <option value="kinetic">물리</option>
            <option value="energy">에너지</option>
            <option value="power">파워</option>
          </select>
        </div>
        <div className="flex flex-1 flex-col">
          <label htmlFor="rarity">피해 유형</label>
          <select
            disabled={item.slot === "kinetic"}
            className="unstyled rounded-none border bg-white p-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:dark:bg-gray-500"
            id="rarity"
            value={item.damageType}
            onChange={(e) =>
              item.setDamageType(e.target.value as Item["damageType"])
            }
          >
            <option value="arc">전기</option>
            <option value="solar">태양</option>
            <option value="void">공허</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="level">레벨</label>
        <input
          className="border bg-white p-2"
          id="level"
          type="number"
          value={item.level}
          onChange={(e) => item.setLevel(Number(e.target.value))}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description">설명</label>
        <textarea
          className="border bg-white p-2"
          id="description"
          value={item.description}
          onChange={(e) => item.setDescription(e.target.value)}
        />
      </div>
    </form>
  );
};
