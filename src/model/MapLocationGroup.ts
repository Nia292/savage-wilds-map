import {MapLocation} from "./MapLocation";

export interface MapLocationGroup {
    // Unique ID of this location group
    id: string;
    // Name of this group, e.g. "Giant Crocodile"
    name: string;
    // Type of the location group
    type: LocationGroupType;
    // If available, funcom ID of this object
    funcomId: string;
    // A general description on where to find this lcation
    locationDescription?: string;
    // Actual locations
    locations: MapLocation[];
}

export enum LocationGroupType {
	ALTAR = 'ALTAR',
	ANIMAL = 'ANIMAL',
	AVATAR = 'AVATAR',
	BASE = 'BASE',
	BEDROLL = 'BEDROLL',
	BOSS = 'BOSS',
	CARAVAN = 'CARAVAN',
	CAVE = 'CAVE',
	DANGER = 'DANGER',
	DERKETO = 'DERKETO',
	DIALOG_NPC = 'DIALOG_NPC',
	DUNGEON = 'DUNGEON',
	EMOTE = 'EMOTE',
	EVENT = 'EVENT',
	FEAT = 'FEAT',
	MERCHANT = 'MERCHANT',
	MITRA = 'MITRA',
	PET = 'PET',
	POINT_OF_INTEREST = 'POINT_OF_INTEREST',
	PURGE = 'PURGE',
	RESOURCE_ORE = 'RESOURCE_ORE',
	RESOURCE_PLANT = 'RESOURCE_PLANT',
	RUIN = 'RUIN',
	SECRET = 'SECRET',
	SET = 'SET',
	STAMP1 = 'STAMP1',
	STAMP2 = 'STAMP2',
	STAMP3 = 'STAMP3',
	STAMP4 = 'STAMP4',
	STAMP5 = 'STAMP5',
	SUMMON = 'SUMMON',
	THRALL_CAMP_BLACK_HAND = 'THRALL_CAMP_BLACK_HAND',
	THRALL_CAMP_BLACK_HAND_CAPITAL = 'THRALL_CAMP_BLACK_HAND_CAPITAL',
	THRALL_CAMP_CIMMERIAN = 'THRALL_CAMP_CIMMERIAN',
	THRALL_CAMP_CIMMERIAN_CAPITAL = 'THRALL_CAMP_CIMMERIAN_CAPITAL',
	THRALL_CAMP_CRIMSON_TIDE = 'THRALL_CAMP_CRIMSON_TIDE',
	THRALL_CAMP_CRIMSON_TIDE_CAPITAL = 'THRALL_CAMP_CRIMSON_TIDE_CAPITAL',
	THRALL_CAMP_DARFARI = 'THRALL_CAMP_DARFARI',
	THRALL_CAMP_DARFARI_CAPITAL = 'THRALL_CAMP_DARFARI_CAPITAL',
	THRALL_CAMP_DOGS = 'THRALL_CAMP_DOGS',
	THRALL_CAMP_DOGS_CAPITAL = 'THRALL_CAMP_DOGS_CAPITAL',
	THRALL_CAMP_EXILE = 'THRALL_CAMP_EXILE',
	THRALL_CAMP_EXILE_CAPITAL = 'THRALL_CAMP_EXILE_CAPITAL',
	THRALL_CAMP_FROST_GIANT = 'THRALL_CAMP_FROST_GIANT',
	THRALL_CAMP_FROST_GIANT_CAPITAL = 'THRALL_CAMP_FROST_GIANT_CAPITAL',
	THRALL_CAMP_JHEBBAL = 'THRALL_CAMP_JHEBBAL',
	THRALL_CAMP_LEMURIAN = 'THRALL_CAMP_LEMURIAN',
	THRALL_CAMP_LEMURIAN_CAPITAL = 'THRALL_CAMP_LEMURIAN_CAPITAL',
	THRALL_CAMP_PIRATE = 'THRALL_CAMP_PIRATE',
	THRALL_CAMP_RELIC_HUNTERS = 'THRALL_CAMP_RELIC_HUNTERS',
	THRALL_CAMP_RELIC_HUNTERS_CAPITAL = 'THRALL_CAMP_RELIC_HUNTERS_CAPITAL',
	THRALL_CAMP_SERPENTMEN = 'THRALL_CAMP_SERPENTMEN',
	THRALL_CAMP_SERPENTMEN_CAPITAL = 'THRALL_CAMP_SERPENTMEN_CAPITAL',
	THRALL_CAMP_UNNAMED_CITY = 'THRALL_CAMP_UNNAMED_CITY',
	THRALL_CAMP_UNNAMED_CITY_CAPITAL = 'THRALL_CAMP_UNNAMED_CITY_CAPITAL',
	THRALL_CAMP_VANIR = 'THRALL_CAMP_VANIR',
	THRALL_CAMP_VANIR_CAPITAL = 'THRALL_CAMP_VANIR_CAPITAL',
	TREASURE = 'TREASURE',
	UNKNOWN = 'UNKNOWN',
	VAULT = 'VAULT',
	WORLD_BOSS = 'WORLD_BOSS',
	YMIR = 'YMIR',
	YOG = 'YOG',
}

export function determineIcon(location: MapLocation): string {
    switch (location.type) {
	case LocationGroupType.ALTAR:	
		return 'icon_altar.png';
	case LocationGroupType.ANIMAL:	
		return 'icon_animal.png';
	case LocationGroupType.AVATAR:	
		return 'icon_avatar.png';
	case LocationGroupType.BASE:	
		return 'icon_player_base.png';
	case LocationGroupType.BEDROLL:	
		return 'icon_bedroll.png';
	case LocationGroupType.BOSS:	
		return 'icon_boss_monster.png';    
	case LocationGroupType.CARAVAN:	
		return 'icon_caravan.png';      
	case LocationGroupType.CAVE:	
		return 'icon_cave.png';
	case LocationGroupType.DANGER:	
		return 'icon_danger.png';
	case LocationGroupType.DERKETO:	
		return 'icon_derketo.png';
	case LocationGroupType.DIALOG_NPC:	
		return 'icon_dialog_npc.png';
	case LocationGroupType.DUNGEON:	
		return 'icon_vault.png';
	case LocationGroupType.EMOTE:	
		return 'icon_performerT4.png';
	case LocationGroupType.EVENT:	
		return 'icon_Event.png';
	case LocationGroupType.FEAT:	
		return 'icon_feat.png';
	case LocationGroupType.MERCHANT:	
		return 'icon_merchant.png';
	case LocationGroupType.MITRA:	
		return 'icon_mitra.png';
	case LocationGroupType.PET:	
		return 'icon_pet.png';
	case LocationGroupType.POINT_OF_INTEREST:	
		return 'icon_vista.png';
	case LocationGroupType.PURGE:	
		return 'icon_Purge.png';
	case LocationGroupType.RESOURCE_ORE:	
		return 'icon_mineral.png';
	case LocationGroupType.RESOURCE_PLANT:	
		return 'icon_plant.png';
	case LocationGroupType.RUIN:	
		return 'icon_ruin.png';
	case LocationGroupType.SECRET:	
		return 'icon_filter.png';
	case LocationGroupType.SET:	
		return 'icon_set.png';
	case LocationGroupType.STAMP1:	
		return 'icon_stamp1.png';
	case LocationGroupType.STAMP2:	
		return 'icon_stamp2.png';
	case LocationGroupType.STAMP3:	
		return 'icon_stamp3.png';
	case LocationGroupType.STAMP4:	
		return 'icon_stamp4.png';
	case LocationGroupType.STAMP5:	
		return 'icon_stamp5.png';
	case LocationGroupType.SUMMON:	
		return 'icon_summoned_avatar.png';
	case LocationGroupType.THRALL_CAMP_BLACK_HAND:	
		return 'icon_black_hand.png';
	case LocationGroupType.THRALL_CAMP_BLACK_HAND_CAPITAL:	
		return 'icon_capital_black_hand.png';
	case LocationGroupType.THRALL_CAMP_CIMMERIAN:	
		return 'icon_cimmerian.png';
	case LocationGroupType.THRALL_CAMP_CIMMERIAN_CAPITAL:	
		return 'icon_capital_cimmerian.png';
	case LocationGroupType.THRALL_CAMP_CRIMSON_TIDE:	
		return 'icon_CrimsonTide.png';
	case LocationGroupType.THRALL_CAMP_CRIMSON_TIDE_CAPITAL:	
		return 'icon_capital_CrimsonTide.png';
	case LocationGroupType.THRALL_CAMP_DARFARI:	
		return 'icon_darfari.png';
	case LocationGroupType.THRALL_CAMP_DARFARI_CAPITAL:	
		return 'icon_darfari_capital.png';
	case LocationGroupType.THRALL_CAMP_DOGS:	
		return 'icon_dogs_of_the_desert.png';
	case LocationGroupType.THRALL_CAMP_DOGS_CAPITAL:	
		return 'icon_capital_dogs_of_the_desert.png';
	case LocationGroupType.THRALL_CAMP_EXILE:	
		return 'icon_camp.png';
	case LocationGroupType.THRALL_CAMP_EXILE_CAPITAL:	
		return 'icon_capital_exiles.png';  
	case LocationGroupType.THRALL_CAMP_FROST_GIANT:	
		return 'icon_frost_giant.png';
	case LocationGroupType.THRALL_CAMP_FROST_GIANT_CAPITAL:	
		return 'icon_capital_frost_giant.png';
	case LocationGroupType.THRALL_CAMP_JHEBBAL:	
		return 'icon_jhebbal.png';
	case LocationGroupType.THRALL_CAMP_LEMURIAN:	
		return 'icon_lemurian.png';
	case LocationGroupType.THRALL_CAMP_LEMURIAN_CAPITAL:	
		return 'icon_lemurian_capital.png';
	case LocationGroupType.THRALL_CAMP_PIRATE:	
		return 'icon_pirate.png';
	case LocationGroupType.THRALL_CAMP_RELIC_HUNTERS:	
		return 'icon_relic_hunter.png';
	case LocationGroupType.THRALL_CAMP_RELIC_HUNTERS_CAPITAL:	
		return 'icon_relic_hunter_capital.png';
	case LocationGroupType.THRALL_CAMP_SERPENTMEN:	
		return 'icon_serpentmen.png';
	case LocationGroupType.THRALL_CAMP_SERPENTMEN_CAPITAL:	
		return 'icon_capital_serpentmen.png';
	case LocationGroupType.THRALL_CAMP_UNNAMED_CITY:	
		return 'icon_unnamed_city.png';
	case LocationGroupType.THRALL_CAMP_UNNAMED_CITY_CAPITAL:	
		return 'icon_capital_unnamed_city.png';
	case LocationGroupType.THRALL_CAMP_VANIR:	
		return 'icon_vanir.png';
	case LocationGroupType.THRALL_CAMP_VANIR_CAPITAL:	
		return 'icon_capital_vanir.png';
	case LocationGroupType.TREASURE:	
		return 'icon_treasure.png';
	case LocationGroupType.UNKNOWN:	
		return 'icon_unknown_object.png';
	case LocationGroupType.VAULT:	
		return 'icon_vault.png';
	case LocationGroupType.WORLD_BOSS:	
		return 'icon_worldboss.png';
	case LocationGroupType.YMIR:	
		return 'icon_ymir.png';
	case LocationGroupType.YOG:	
		return 'icon_yog.png';
    }
    console.error('Failed to determine icon for ', location)
    return '';
}
