using System.Collections.Generic;
using System.Data.SqlClient;
using Dapper;



namespace americano_tournaments.core
{
    public class TournamentClient
    {
        public static string connectionString { get; set; }
        public TournamentClient(string connstring)
        {
            connectionString = connstring;
        }

        public List<string> GetTest()
        {
            string sql = $@"SELECT [Value]
  FROM [Prime].[dbo].[MyTable]";


            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                List<string> rows = connection.Query<string>(sql).AsList();
                return rows;
            }
        }
    }
}