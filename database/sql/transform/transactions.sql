insert into prime.dbo.transactionstmp
SELECT t.*
  
from(
SELECT  CONVERT(datetime, REPLACE(date, '"', '') , 103) as date
      ,REPLACE(saajamaksaja, '"', '') as saajamaksaja
      ,REPLACE(selite, '"', '') as selite
      ,REPLACE(REPLACE(Viesti, '''', '') , '"', '') as viesti
      ,try_cast(REPLACE(REPLACE(amount, ',','.'), '"', '') as decimal(6,2)) as amount
  FROM [Prime].[dbo].[transactions] 

) t
  left join prime.dbo.transactionstmp tmp on t.[date] = tmp.date 
    and t.saajamaksaja = tmp.saajamaksaja  
    and t.selite = tmp.selite
    and t.viesti = tmp.viesti
    and t.amount = tmp.amount 
  where tmp.date is null
 