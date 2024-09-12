import {Model, Table, PrimaryKey, Column} from "sequelize-typescript"

@Table({
    tableName: "customer",
    timestamps: false
})
export default class CustomerModel extends Model{
@PrimaryKey
@Column
declare id: string

@Column({allowNull: true})
declare street: string;

@Column({allowNull:true})
declare number:number

@Column({allowNull:true})
declare zip: string

@Column({allowNull:true})
declare city:string

@Column({allowNull:false})
declare active: boolean

@Column({allowNull:false})   
declare rewardPoints: number

@Column({allowNull:false})   
declare name: string

}